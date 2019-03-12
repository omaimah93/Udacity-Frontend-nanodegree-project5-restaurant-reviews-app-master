if ('serviceWorker' in navigator) {
	navigator.serviceWorker
	.register('sw.js')
	.then( function () {
		console.log('Service Worker is registered successfully');
	})
	.catch(function () {
      console.log('Service Worker Registration Failed');
    });
}
