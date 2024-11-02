import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { getCart, getTotalPrize } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const username = useSelector(state => state?.user?.username);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrize);
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isSubmitting = navigation.state === 'submitting';
  const [withPriority, setWithPriority] = useState(false);
  const priorityPrice = 15;
  const actualPrice = totalPrice + priorityPrice;

  if(!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input w-full" type="text" name="customer" required defaultValue={username}/>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 bg-red-100 text-red-700 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input 
              className="input w-full"
              type="text" 
              name="address" 
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-100 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            value={withPriority}
            onChange={(el) => setWithPriority(el.target.value)}
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button
            type="primary"
            disabled={isSubmitting}>
            {isSubmitting ? "Placing Order" : `Order now for ${formatCurrency(actualPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request}) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }

  const errors = {};
  if(!isValidPhone(order.phone)) errors.phone = 'Please enter correct number';

  if(Object.keys(errors).length) return errors;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
