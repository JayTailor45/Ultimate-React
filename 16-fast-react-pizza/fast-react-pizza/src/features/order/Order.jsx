// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from './OrderItem';
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    if(!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu')
    }
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="rounded-full bg-red-500 px-2 py-1 text-sm uppercase text-red-100 tracking-wide">Priority</span>}
          <span className="rounded-full bg-green-500 px-2 py-1 text-sm uppercase text-green-100 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map(item => <OrderItem item={item} key={item.pizzaId} 
          ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients || []}
          isLoadingIngredients={fetch?.state === 'loading'}
        />)}
      </ul>

      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="font-medium text-sm text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="font-medium text-sm text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({params}) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
