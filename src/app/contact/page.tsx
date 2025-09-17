export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Your Email" className="w-full border p-2 rounded" />
        <textarea placeholder="Your Message" className="w-full border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </form>
    </div>
  );
}
