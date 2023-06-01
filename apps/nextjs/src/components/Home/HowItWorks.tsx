const posts = [
  {
    id: 1,
    title: "Step 1: Create a class and assign your students and criteria",
    imageUrl: "/step1.jpg",
  },
  {
    id: 2,
    title: "Step 2: Evaluate your students",
    imageUrl: "/step2.jpg",
  },
  {
    id: 3,
    title: "Step 3: Generate your comments",
    imageUrl: "/step3.jpg",
  },
  // More posts...
];

const HowItWorks: React.FC = () => {
  return (
    <div id="product" className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-purple-600">
            How it works
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src={post.imageUrl}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/10" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <div className="-ml-4 flex items-center gap-x-4">
                  <svg
                    viewBox="0 0 2 2"
                    className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                <span className="absolute inset-0" />
                {post.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
