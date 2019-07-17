import fetch from "node-fetch"
import { JSDOM } from "jsdom"

export default class Default {
    static async index(request, reply) {
        reply.type('application/json').code(200);

        const req = await fetch(`${process.env.BASE_URL}${process.env.PAGE}`);
        const data = await req.text();
        const { document } = (new JSDOM(data)).window;
        const li = [...document.querySelectorAll('ul.vertical-list > li > a:not(.articleactivebutton)')];

        const text = li.map(async (a) => {
            const result = await fetch(`${process.env.BASE_URL}/${a.href}`);
            const body = await result.text();

            const { document: fragment } = (new JSDOM(body)).window;

            // pet data container shifted by 1 index
            const petData =  {...[0, ...fragment.querySelectorAll('.petcard_container')]};

            // strat id
            const stratId = fragment.querySelector('input[name="comsortid"]').value;

            // name
            const name = fragment.querySelector(`#rm_name_${stratId}`).textContent;

            // get fight
            let fight = parseInt(fragment.querySelector(`#rm_fight_${stratId}`).textContent);
            fight = fight === 0 ? '' : fight.toString(32).toUpperCase();

            // required lvl
            let requiredLvl = 1;

            const pets = {};
            [1, 2, 3].forEach(i=>{
                let special = petData[i].querySelector(`#rm_p${i}_s${stratId}_special`).textContent;
                if (special === '0') {
                    const subcount = parseInt(petData[i].querySelector(`#rm_p${i}_s${stratId}_subscount`).textContent);
                    const activePet = subcount === 1 ? 0 : parseInt(fragment.querySelector(`#bt_petcounter_${i}`).textContent) - 1;
                    const breed = petData[i].querySelector(`#rm_p${i}_s${stratId}_sub${activePet}_breed`).textContent || 0;
                    const skils = petData[i].querySelector(`#rm_p${i}_s${stratId}_sub${activePet}_skills`).textContent;
                    const species = parseInt(petData[i].querySelector(`#rm_p${i}_s${stratId}_sub${activePet}_species`).textContent);
                    pets[i] = `${skils}${breed}${species.toString(32).toUpperCase()}`;
                } else if (special === '1') {
                    pets[i] = petData[i].querySelector(`#rm_p${i}_s${stratId}_qc`).textContent;
                } else if (special === '2') {
                    pets[i] = petData[i].querySelector(`#rm_p${i}_s${stratId}_qc`).textContent;
                    let reqLvl = parseInt(petData[i].querySelector(`#rm_p${i}_s${stratId}_level`).textContent);
                    requiredLvl = Math.max(requiredLvl, reqLvl);
                }
            });

            const preferences = requiredLvl > 1 ? `P:::::${requiredLvl}::` : '';

            return `${name}:${fight}:${pets[1] || ''}:${pets[2] || ''}:${pets[3] || ''}:${preferences}`;
        });

        const pet = await Promise.all(text);

        return { pet, data: pet.filter(Boolean).join("\r\n") }
    }
}
