import React from 'react';

const MiniCartItem = (props) => {
    return (
        <tr key={props.prod.id}>
            <td>
                <img src={props.prod.image} className="ui small image" alt={props.prod.name} />
            </td>
            <td>
                {props.prod.name}
            </td>
            <td>
                {props.prod.quantity}
            </td>
            <td className="right aligned price">
                ${props.prod.price.toFixed(2)}
            </td>
            <td className="action right aligned">
                <i className="times circle icon large ui red btn" onClick={props.deleteAction}></i>
            </td>
        </tr>
    );
}
export default MiniCartItem;