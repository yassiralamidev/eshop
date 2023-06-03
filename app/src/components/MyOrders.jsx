import React from 'react'

function MyOrders({userData}) {
  
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  return (
    <div className='myOrders'>
      <h3>My Orders</h3>
      <div className='myOrders__list'>
        {userData.orders.length > 0 ? 
          userData.orders.map((order,key)=>{
            return(
              <div key={key} className='orderContainer'>
                <div className='orderContainer__left'>
                  {order.products.map((product,key)=>{
                    return(
                      <p key={key}>
                        {product.quantity}x&nbsp;{product.name}
                      </p>
                    )
                  })}
                </div>
                <div className='orderContainer__right'>
                  <p>{new Date(order.date).toLocaleDateString("en-GB", timeOptions)}</p>
                  <p>Total:&nbsp;{order.total}&nbsp;DH</p>
                </div>
              </div>
            )
          })
        : <p>You have 0 orders</p>}
      </div>
    </div>
  )
}

export default MyOrders