class Treasure {
    constructor(name, image, strength, wisdom, stealth, luck, stamina, intelligence, charm, magic) {
      this.name = name;
      this.shortName = name.replace(/\s/g, '').toLowerCase();
      this.image = image;
      this.strength = strength;
      this.wisdom = wisdom;
      this.stealth = stealth;
      this.luck = luck;
      this.stamina = stamina;
      this.intelligence = intelligence;
      this.charm = charm;
      this.magic = magic;
    }
  }

  export default Treasure;