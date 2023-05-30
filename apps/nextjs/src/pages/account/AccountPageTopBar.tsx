import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const PurchaseButton = () => {
  const { mutateAsync: createCheckoutSession } =
    trpc.stripe.createCheckoutSession.useMutation();
  const { push } = useRouter();
  return (
    <button
      onClick={async () => {
        const { checkoutUrl } = await createCheckoutSession();
        if (checkoutUrl) {
          void push(checkoutUrl);
        }
      }}
      type="button"
      className="rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      Buy 1 Credit
    </button>
  );
};

const AccountPageTopBar: React.FC = () => {
  const { data: teacherData } = trpc.teacher.byId.useQuery();

  return (
    <div className="flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm">
      <div className="pr-2">
        <dt className="sr-only">Report Credits</dt>
        <dd className="rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
          {teacherData?.reportCredits} Report Credits Available
        </dd>
      </div>

      <PurchaseButton />
    </div>
  );
};

export default AccountPageTopBar;
