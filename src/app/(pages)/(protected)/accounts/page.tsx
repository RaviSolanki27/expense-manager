import IconButton from "@/components/Buttons/IconButton";
import Card from "@/components/cards/Card";
import { formatCurrency } from "@/utils";
import { Ellipsis, PlusIcon } from "lucide-react";

const Accounts = () => {
  return (
    <div>
      <div>{/* <h1>Accounts</h1> */}</div>
      <div className="flex gap-4">
        <div>
          <Card title="Total balance" className="min-w-[350px] flex flex-col h-full">
            <div className="flex flex-col h-full">
              <div className="text-3xl font-bold">
                {formatCurrency(1000, "en", "USD", true)}
              </div>
              <div className="text-xs text-gray-500">Your capital consists of 3 sources</div>
              <div className="flex gap-2 mt-auto">
                <IconButton label="Transfer" frontIcon={<PlusIcon size={25} />} className="bg-purple-60 text-secondary border-none hover:bg-purple-50 hover:text-secondary" />
                <IconButton label="Request" frontIcon={<PlusIcon size={25} />} className="bg-purple-60 text-secondary border-none hover:bg-purple-50 hover:text-secondary" />
                <IconButton frontIcon={<Ellipsis size={25} />} className="bg-purple-60 text-secondary border-none hover:bg-purple-50 hover:text-secondary" />
              </div>
            </div>
          </Card>
        </div>
        <div className="flex w-full gap-4">
          <Card title="Banks" className="w-full">
            ddd
          </Card>
          <Card title="Cash" className="w-full">
            Cash
          </Card>
          <Card title="Others" className="w-full">
            Others
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Accounts;
