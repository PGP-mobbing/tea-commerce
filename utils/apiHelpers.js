export async function fetchGetJSON(url) {
  try {
    const data = await fetch(url).then((res) => res.json());
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchPostJSON(url, data) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message);
  }
}


export function validateCartItems(inventorySrc, cartDetails) {
  const validatedItems = []

  for (const id in cartDetails) {
    const inventoryItem = inventorySrc.find((currentProduct) => {
      return currentProduct.id === cartDetails[id]._id || currentProduct.sku === id
    })
    if (inventoryItem === undefined) {
      throw new Error(
        `Invalid Cart: product with id "${id}" is not in your inventory.`
      )
    }

    const item = {
      price_data: {
        currency: "nok",
        unit_amount: inventoryItem.price * 100,
        product_data: {
          name: inventoryItem.title,
          ...inventoryItem.product_data
        },
        ...inventoryItem.price_data
      },
      quantity: cartDetails[id].quantity
    }

    if (
      cartDetails[id].product_data &&
      typeof cartDetails[id].product_data.metadata === 'object'
    ) {
      item.price_data.product_data.metadata = {
        ...item.price_data.product_data.metadata,
        ...cartDetails[id].product_data.metadata
      }
    }

    if (
      typeof inventoryItem.description === 'string' &&
      inventoryItem.description.length > 0
    )
      item.price_data.product_data.description = inventoryItem.description

    if (
      typeof inventoryItem.image === 'string' &&
      inventoryItem.image.length > 0
    )
      item.price_data.product_data.images = [inventoryItem.image]

    validatedItems.push(item)
  }

  return validatedItems
}

function formatLineItems(cartDetails) {
  const lineItems = []
  for (const id in cartDetails)
    lineItems.push({ price: id, quantity: cartDetails[id].quantity })

  return lineItems
}
