export default function Home() {
  return (
    <div className="bg-sky-200 w-full min-h-screen py-10 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-blue-600">
          Library Management System
        </h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition w-64">
            <div className="text-blue-600 text-5xl mb-4">
              <i className="bi bi-person-heart"></i>
            </div>

            <h5 className="text-xl font-semibold mb-2">Category</h5>

            <p className="text-gray-500 text-sm mb-4">
              Manage Category records
            </p>

            <a
              href="/CategoryList"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-600 hover:text-white transition"
            >
              Open
            </a>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition w-64">
            <div className="text-blue-600 text-5xl mb-4">
              <i className="bi bi-person-heart"></i>
            </div>

            <h5 className="text-xl font-semibold mb-2">Member</h5>

            <p className="text-gray-500 text-sm mb-4">Manage Member records</p>

            <a
              href="/MemberList"
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-600 hover:text-white transition"
            >
              Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
