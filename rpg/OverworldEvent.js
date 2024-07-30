class OverworldEvent {
    constructor({map, event}){
        this.map = map;
        this.event = event;
    }

    stand(resolve){
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        //Set up a handler to complete when correct person is done walking, then resolve the event
        const completeHandler = e => {
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("PersonStandComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve){
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        //Set up a handler to complete when correct person is done walking, then resolve the event
        const completeHandler = e => {
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    textMessage(resolve){

        if(this.event.faceHero) {
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }


        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"));
    }

    changeMap(resolve){ 
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () =>{
            resolve();
            window.open(this.event.link, "_self");
            sceneTransition.fadeOut();
            
        });
        this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
        resolve();
    }

    openLink(resolve){ 
        window.open(this.event.link, "_blank");
        resolve();
    }

    selectionMenu(resolve) {
        const menu = new SelectionMenu({
          lab: this.event.lab,
          link: this.event.link,
          onComplete: () => {
            resolve();
          }
        })
        menu.init(document.querySelector(".game-container"))
      }

      flagMenu(resolve) {
        const menu = new FlagMenu({
          onComplete: (flag) => {
            console.log("flag: "+ flag)
            if(flag === "7N9WBG6WJ2"){
                window.playerState.storyFlags[flag] = true;
            }
            resolve();
          }
        })
        menu.init(document.querySelector(".game-container"))
      }

      addStoryFlag(resolve) {
        window.playerState.storyFlags[this.event.flag] = true;
        resolve();
      }

    init(){
        return new Promise(resolve => {
            this[this.event.type](resolve);
        })
    }

}