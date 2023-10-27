import prisma from "@/lib/prisma"
import { IncomingHttpHeaders } from "http"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook, WebhookRequiredHeaders } from "svix"

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ""

type EventType = "user.created" | "user.updated" | "*"

type Event = {
  data: EventDataType
  object: "event"
  type: EventType
}

type EventDataType = {
  id: string
  first_name: string
  last_name: string
  email_address: EmailAddresType[]
  primary_email_addres_id: string
  attributes: Record<string, string | number>
}

type EmailAddresType = {
  id: string
  email_address: string
}

async function handler(request: Request) {
  const payload = await request.json()
  const headerList = headers()
  const heads = {
    "svix-id": headerList.get("svix-id"),
    "svix-signature": headerList.get("svix-signature"),
    "svix-timestamp": headerList.get("svix-timestamp")
  }

  const wh = new Webhook(webhookSecret)
  let evt: Event | null = null

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event
  } catch (error) {
    console.error((error as Error).message)
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    )
  }

  const eventType: EventType = evt.type

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      first_name,
      last_name,
      email_address,
      primary_email_addres_id,
      ...attributes
    } = evt.data

    await prisma.user.upsert({
      where: { externalId: id as string },
      create: { externalId: id as string, attributes },
      update: { attributes }
    })
  }

  return NextResponse.json({ ok: true })
}

export const GET = handler
export const POST = handler
export const PUT = handler
