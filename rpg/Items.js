class Items extends GameObject {
    constructor(config) {
      super(config);
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src || "",
      });
      this.talking = config.talking || [];
    }
}