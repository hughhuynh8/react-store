export default function swDev() {
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register(swUrl)
            .then((reg) => console.log('service worker registerered', reg)) // successful, returns a registration object
            .catch((err) => console.log('service worker not registered', err))  // unsuccessful, returns an error object
    }
}