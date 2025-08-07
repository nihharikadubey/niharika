// Contact.jsx
export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6 max-w-xl">
        <h2 className="text-4xl font-bold mb-8">Contact Me</h2>
        <form action="https://formspree.io/f/{your-id}" method="POST" className="space-y-6">
          <input name="name" placeholder="Your Name" className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
          <input type="email" name="email" placeholder="Your Email" className="w-full p-3 rounded bg-gray-800 border border-gray-700" />
          <textarea name="message" placeholder="Your Message" rows="5" className="w-full p-3 rounded bg-gray-800 border border-gray-700"></textarea>
          <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 py-3 rounded font-semibold">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}