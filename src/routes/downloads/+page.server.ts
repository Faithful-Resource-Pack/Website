import type { Load } from '@sveltejs/kit';

export const load: Load = async ({fetch}) => {
    const path = '/json/';
    const FILES = [
      'f32.json',
      'f32b.json',
      'f64.json',
      'f64b.json',
      'f32d.json',
      'cf32j.json',
      'cf32jb.json'
    ];

    const URLS = FILES.map(u => path + u);

    const results = await Promise.all(URLS.map(u => fetch(u)));
    let jsons = await Promise.all(results.map(r => r.json()));

    // https://github.com/Faithful-Resource-Pack/Website/blob/master/js/download/index.js
    const CURSE_API = 'https://api.cfwidget.com/'
    const CURSE_PACK_TO_ID = {
      'c32': 436482,
      'c32b': 507188,
      'c64': 419139,
    }
    const CURSE_URLS = Object.values(CURSE_PACK_TO_ID).map(id => `${CURSE_API}${id}`);
    const curse_results = await Promise.all(CURSE_URLS.map(u => fetch(u)));
    const curse_jsons = await Promise.all(curse_results.map(r => r.json()));
    const curse_files = curse_jsons.map(r => r.files).flat();

    jsons = jsons.map((json ,i) => {
      Object.keys(json).forEach(version => {
        const releases = json[version];
        releases.forEach((release: any) => {
          const curse_link = release.links.curse;
          if(curse_link) {
            const curse_id = curse_link.split('/').pop();
            const found_curse_file = curse_files.filter(f => String(f.id) === String(curse_id))[0];
            if(found_curse_file) {
              release.date = found_curse_file.uploaded_at.split('T').shift().split('-').reverse().join('/');
              release.size = String(found_curse_file.filesize);
            }
          }
        })
      });
      return json
    });

    return {
      title: "Downloads",
      packs: [{
        name: "Faithful 32x",
        editions: [{
          name: "Java Edition",
          downloads: jsons[0]
        },{
          name: "Bedrock Edition",
          downloads: jsons[1]
        },{
          name: "Minecraft: Dungeons",
          downloads: jsons[4]
        }]
      },{
        name: "Faithful 64x",
        editions: [{
          name: "Java Edition",
          downloads: jsons[2]
        },{
          name: "Bedrock Edition",
          downloads: jsons[3]
        }]
      }, {
        name: "Classic Faithful 32x Jappa",
        editions: [{
          name: "Java Edition",
          downloads: jsons[5]
        },{
          name: "Bedrock Edition",
          downloads: jsons[6]
        }]
      }, {
        name: "Classic Faithful 32x Programmer Art",
        editions: [{
          name: "Java Edition",
          downloads: {}
        },{
          name: "Bedrock Edition",
          downloads: {}
        }]
      }, {
        name: "Classic Faithful 64x",
        editions: [{
          name: "Java Edition",
          downloads: {}
        },{
          name: "Bedrock Edition",
          downloads: {}
        }]
      }]
    };
}