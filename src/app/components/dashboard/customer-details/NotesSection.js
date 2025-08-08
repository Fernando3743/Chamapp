"use client";

export default function NotesSection({ notes, setNotes, noteText, setNoteText, addNote }) {
  return (
    <div className="glass border border-white/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Customer Notes</h3>
      </div>
      <div
        className="space-y-4 max-h-96 overflow-y-auto pr-3"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.2) rgba(255,255,255,0.05)",
        }}
      >
        {notes.map((note) => (
          <div key={note.id} className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">{note.author}</span>
              <span className="text-xs text-white/70">{note.date}</span>
            </div>
            <div className="text-sm text-white/80 leading-relaxed">
              {note.content}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-white/10">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white text-sm resize-y min-h-20 mb-4 focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-colors"
          placeholder="Add a note about this customer..."
        />
        <button
          onClick={addNote}
          className="px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}