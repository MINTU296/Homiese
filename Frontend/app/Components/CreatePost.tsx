
'use client'

import { useState, FormEvent } from 'react'

interface CreatePostProps {
    onSubmit: (description: string) => void
}

export default function CreatePost({ onSubmit }: CreatePostProps) {
    const [text, setText] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const trimmed = text.trim()
        if (!trimmed) return
        onSubmit(trimmed)
        setText('')
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow mb-6"
        >
      <textarea
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          rows={3}
          placeholder="What's on your mind?"
          value={text}
          onChange={e => setText(e.target.value)}
      />
            <div className="flex justify-end mt-2">
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="bg-red-400 text-white px-4 py-1 rounded disabled:opacity-50"
                >
                    Post
                </button>
            </div>
        </form>
    )
}
