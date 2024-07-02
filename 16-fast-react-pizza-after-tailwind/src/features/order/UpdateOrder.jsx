import React from 'react';
import Button from '../../ui/Button';
import { useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    //This is a form that will be submitted to the server, it acts like a normal form, but the difference is that it will be submitted to the server and it won't refresh the page. It'll simply submit the form and revalidate the page.
    // this automatically re-fetch the order and update it with the new data
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={'primary'}>Make Priority</Button>;
    </fetcher.Form>
  );
}


// params is an object that contains the parameters from the URL, in this case, the orderId : "http://localhost:5173/order/BHIBQ2" orderId is BHIBQ2
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  
  return null;
}
