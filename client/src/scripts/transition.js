if(navigation.addEventListener){
   navigation.addEventListener("navigate", (event) => {
      if(!event.destination.url.includes(document.location.origin)){
         return;
      }

      event.intercept({
         handler: async () => {
            const response = await fetch(event.destination.url);
            const text = await response.text();

            const transition = document.startViewTransition(() => {
               const body = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1]
               document.body.innerHTML = body;

               const title = text.match(/<title[^>]*>(.*?)<\/title>/i)[1]
               document.title = title;
            });

            transition.ready.then(() => {
               window.scrollTo(0,0)
            })
         },
         scroll: "manual"
      });
   })
}