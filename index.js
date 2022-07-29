const mineflayer = require('mineflayer')
const autoeat = require("mineflayer-auto-eat")
// const fs = require('fs');
// let rawdata = fs.readFileSync('config.json');
// let data = JSON.parse(rawdata);
// var host = data["ip"];
// var username = data["name"]

// var bot = mineflayer.createBot({
//   host: host,
//   username: username
// });


const bot = mineflayer.createBot({
  host:'ir.skyblock.uz',
  // port: 57285,
  username: 'Magnus'
 })
 
 let continue_digging = true; 
 


// Load the plugin
bot.loadPlugin(autoeat)

bot.once("spawn", () => {
  bot.autoEat.options.priority = "foodPoints"
  bot.autoEat.options.bannedFood = []
  bot.autoEat.options.eatingTimeout = 3
})

// The bot eats food automatically and emits these events when it starts eating and stops eating.

bot.on("autoeat_started", () => {

})

bot.on("autoeat_stopped", () => {

})

bot.on("health", () => {
  if (bot.health === 20) bot.autoEat.disable()
    else bot.autoEat.enable()
})
 
bot.once("spawn", () => {
  bot.chat("/login plokplok");
})


bot.on('chat', (username, message) => {
  if (message == 'digmagnus') {
    continue_digging=true;
    dig()  
  }
})

async function dig() {
  if(!continue_digging){return};
  if (!bot.heldItem || !bot.heldItem.name.includes('pickaxe')) {
    var pickaxe = bot.inventory.items().filter(i => i.name.includes('pickaxe'))[0]; 
  if (pickaxe) await bot.equip(pickaxe, 'hand')
  }
  var block = bot.blockAtCursor(4);
  if (!block) return setTimeout (function () { dig(); }, 100);
  await bot.dig(block, 'ignore')
  dig()
}

bot.on('chat', (username, message) => {
  if (message == 'stopdigmagnus') {
    continue_digging=false;
  }
})