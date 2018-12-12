// @flow

const callbackDelay = (delay: number = 3000): Promise<string> => {
  const promiseResult = new Promise(resolve => {
    setTimeout(() => {
      resolve(`Delayed for ${delay} ms.`)
    }, delay)
  })

  return promiseResult
}

export default callbackDelay
