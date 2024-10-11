import { DivideIcon } from "@heroicons/react/24/solid";
import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loaidng cabin data...</p>
    </div>
  );
}

export default Loading;
