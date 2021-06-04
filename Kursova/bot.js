require('dotenv').config();

const { Telegraf, Markup} = require('telegraf');
const api = require('covid19-api');
const COUNTRIES_LIST = require('./help');


const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`
Доброго дня ${ctx.message.from.first_name}!,
 що ви хотече дізнатися?
`, 
    Markup.keyboard([
        [ '/Covid19', '/help'],
        
    ])
    .resize()
    )
);
bot.help((ctx) => ctx.reply(COUNTRIES_LIST));

bot.command('Back', (ctx) => ctx.reply(`
Доброго дня ${ctx.message.from.first_name}!,
 що ви хотече дізнатися?
`, 
    Markup.keyboard([
        [ '/Covid19', '/help'],
        
    ])
    .resize()
    )
);


bot.command('Covid19', (ctx) => ctx.reply(`Напешіть назву країни або виберіть з предложених`,

Markup.keyboard([

['Ukraine', 'Kazakhstan', 'Russia'],
['Japan', 'China', 'Moldova'],
['Italy', 'US', '/Back'],
])
.resize()
)
);

bot.on('text', async (ctx) => {
  let data = {};

  try {
  data = await api.getReportsByCountries(ctx.message.text);

  const formatData = `
  Країна: ${data[0][0].country}
  🤧Випадки: ${data[0][0].cases}
  ☠️Смертей: ${data[0][0].deaths}
  😀Одужали: ${data[0][0].recovered}
  `;
  ctx.reply(formatData);
  } catch { 
      console.log('Помилка');
      ctx.reply('На жаль такої країни не існує😓');
  }
});


bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
