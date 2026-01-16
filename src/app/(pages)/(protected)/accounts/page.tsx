import IconButton from "@/components/Buttons/IconButton";
import Card from "@/components/cards/Card";
import { formatCurrency } from "@/utils";
import { Ellipsis, PlusIcon } from "lucide-react";

const Accounts = () => {
  return (
    <div>
      <div>{/* <h1>Accounts</h1> */}</div>
      <div className="flex gap-4 h-full items-end">
        <Card
          title="Total balance"
          className="min-w-[350px] min-h-[200px] h-full flex flex-col justify-between"
        >
          <div className="flex flex-col h-full gap-6">
            <div>
              <div className="text-3xl font-bold">
                {formatCurrency(1000, "en", "USD", true)}
              </div>
              <div className="text-xs text-gray-500">
                Your capital consists of 3 sources
              </div>
            </div>
            <div className="flex gap-2">
              <IconButton
                label="Transfer"
                frontIcon={<PlusIcon size={25} />}
                className="bg-purple-60 text-secondary border-none hover:bg-purple-50 hover:text-secondary"
              />
              <IconButton
                label="Request"
                frontIcon={<PlusIcon size={25} />}
                className="bg-purple-60 text-secondary border-none hover:bg-purple-50 hover:text-secondary"
              />
              <IconButton
                frontIcon={<Ellipsis size={25} />}
                className="bg-secondary text-gray-500 border hover:bg-gray-50 hover:text-gray-500"
              />
            </div>
          </div>
        </Card>

        <div className="flex flex-col justify-between flex-1 h-full gap-2">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="label-md">Your accounts</p>
              <span className="label-xs text-gray-500">3 items</span>
            </div>
            <IconButton
              frontIcon={<PlusIcon size={15} />}
              label="Add new account"
              className="bg-purple-60 text-secondary hover:bg-purple-50 hover:text-secondary"
            />
          </div>
          <div className="flex gap-4 h-full">
            <Card title="Banks" className="w-full h-full">
              ddd
            </Card>
            <Card title="Cash" className="w-full h-full">
              Cash
            </Card>
            <Card title="Others" className="w-full h-full">
              Others
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Accounts;
