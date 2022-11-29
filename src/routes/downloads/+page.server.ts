import type { Load } from '@sveltejs/kit';

export const load: Load = async () => {
    const BASE_URL = 'https://faithfulpack.net';
    const SUB_PATH = '/data/downloads/';
    const FILES = [
      'compliance_32.json',
      'compliance_32b.json',
      'compliance_64.json',
      'compliance_64b.json',
      'compliance_32d.json',
    ];

    const URLS = FILES.map(u => BASE_URL + SUB_PATH + u);

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
          console.log('ver', release)
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
      packs: [{
        name: "Faithful 32x",
        background_url: "https://static.wixstatic.com/media/89b89d_00d0142aaa2741b9a39b1a610593bc7e~mv2.png/v1/fill/w_1290,h_1156,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/89b89d_00d0142aaa2741b9a39b1a610593bc7e~mv2.png",
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
        background_url: "https://static.wixstatic.com/media/89b89d_90727d52167648538da52c71ae08b61c~mv2.png/v1/fill/w_1290,h_531,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/89b89d_90727d52167648538da52c71ae08b61c~mv2.png",
        editions: [{
          name: "Java Edition",
          downloads: jsons[2]
        },{
          name: "Bedrock Edition",
          downloads: jsons[3]
        }]
      }]
    };
}