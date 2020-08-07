import React from 'react';
import moment from 'moment';
import OrderDetails from './OrderDetails';

const OrderItem = ({order}) => {
    return(
        // <p>{order.id}</p>
        <tr key={order.id}>
            <td>
                {order.id}
            </td>
            <td>
                {moment(order.date.toDate()).calendar()}
            </td>
            <td>
                ${order.total.toFixed(2)}
            </td>
            <td>
                Pending
            </td>
            <td className="action">
                <OrderDetails order={order} />
            </td>
        </tr>
    )
}

export default OrderItem;