const Pricing: React.FC = () => {
  return (
    <div id="price" className="flex w-full justify-center">
      <div className="flow-root bg-transparent py-16 sm:pt-32 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className=" ">
            <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-green-600">
              Simple pricing, no commitment
            </h2>
          </div>
          <div className=" mx-auto mt-10 flex max-w-md justify-center  lg:mx-0 lg:-mb-14 lg:max-w-none">
            <div className="rounded-2xl bg-white shadow-xl ring-1 ring-gray-900/10">
              <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                <h2
                  id="tier-scale"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Report Credit
                </h2>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                  <div className="mt-2 flex items-center gap-x-4">
                    <p className="text-4xl font-bold tracking-tight text-gray-900">
                      $2
                    </p>
                    <div className="text-sm leading-5">
                      <p className="text-gray-900">USD</p>

                      <p className="text-gray-500">Per report credit</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flow-root sm:mt-10">
                  <ul
                    role="list"
                    className="-my-2 divide-y divide-gray-900/5 border-t border-gray-900/5 text-sm leading-6 text-gray-600 lg:border-t-0"
                  >
                    <li className="flex gap-x-3 py-2">
                      <svg
                        className="h-6 w-5 flex-none text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Up to 30 students per report
                    </li>
                    <li className="flex gap-x-3 py-2">
                      <svg
                        className="h-6 w-5 flex-none text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Up to 10 criteria per report
                    </li>
                    <li className="flex gap-x-3 py-2">
                      <svg
                        className="h-6 w-5 flex-none text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Up to 30 generated comments per report
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
