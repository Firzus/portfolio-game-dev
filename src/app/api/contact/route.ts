import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { contactMessages } from '@/lib/db/schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Insert into database
    const newMessage = await db.insert(contactMessages).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || '',
      message: message.trim()
    }).returning()

    // TODO: Send email notification using Resend
    // This would be implemented when Resend API key is configured
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message envoyé avec succès',
        id: newMessage[0].id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Méthode non autorisée' },
    { status: 405 }
  )
}
