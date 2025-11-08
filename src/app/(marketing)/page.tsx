export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-primary">Welcome to Our Website</h1>
      <p className="mt-4 text-lg text-gray-600">
        This page is using the marketing layout with navbar and footer.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-primary">Feature 1</h2>
          <p className="mt-2 text-gray-600">This is a great feature that helps users accomplish their goals.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-primary">Feature 2</h2>
          <p className="mt-2 text-gray-600">Another amazing feature that sets us apart from the competition.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-primary">Feature 3</h2>
          <p className="mt-2 text-gray-600">Our third feature that completes the perfect user experience.</p>
        </div>
      </div>
    </div>
  );
}