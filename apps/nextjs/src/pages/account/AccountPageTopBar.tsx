const AccountPageTopBar: React.FC = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm">
      <div className="">
        <dt className="sr-only">Report Credits</dt>
        <dd className="rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
          2 Report Credits Available
        </dd>
      </div>
      <button
        type="button"
        className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Buy credits
      </button>
    </div>
  );
};

export default AccountPageTopBar;
