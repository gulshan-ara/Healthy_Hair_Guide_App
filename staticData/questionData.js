/** This file contains data's regarding questions which will be render in the
 * hair quiz page. Here 5 questions are gathered with relevant options.  
*/
export const QuestionData = [
    {
        id: 'scalpType',
        label: "What's your scalp type?",
        options: [
          { label: 'Dry', value: 'dry' },
          { label: 'Normal', value: 'normal' },
          { label: 'Oily', value: 'oily' },
        ],
        modalText : "If your scalp feels greasy/oily after one or two days of washing, that means you have an oily scalp. If it's non greasy and you can see flakes or itchiness often, then it means you've dry scalp."
    },
    {
        id: 'hairType',
        label: "What's your hair type?",
        options: [
          { label: 'Straight', value: 'straight' },
          { label: 'Wavy', value: 'wavy' },
          { label: 'Curly', value: 'curly' },
          { label: 'Coily', value: 'coily' },
        ],
        modalText : "Hair type means the pattern of your hair shaft at normal non-styled state."
    },
    {
        id: 'hairDensity',
        label: "What's your hair density?",
        options: [
          { label: 'Fine/Thin', value: 'thin' },
          { label: 'Medium', value: 'medium' },
          { label: 'Thick', value: 'thick' },
        ],
        modalText : "It is the width of your single hair strand. If your hair strand is almost invisible and thin, then it's fine/thin hair. If you can feel your strand in between your fingers and not so thin, then it's medium hair. Thick hair is the most easily identifiable due to it's thickness."
    },
    {
        id: 'hairPorosity',
        label: "What's your hair porosity?",
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Normal', value: 'normal' },
          { label: 'High', value: 'high' },
        ],
        modalText : "It defines the water absorption power of your hair. If it takes long to absorb water, then it's low porosity hair. If it absorbs water instantly, then it's high porosity hair."
    },
    {
        id: 'hairElasticity',
        label: "What's your hair elasticity?",
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Normal', value: 'normal' },
          { label: 'High', value: 'high' }
        ],
        modalText : "Hair elasticity defines the need of protein and moisture of your hair. Take a hair strand and strch it gently. If it strechtes a lot before breaking, then it's high elasticity. If the hairstrand breaks instantly, that means it has low elasticity. If it streches and returns to normal shape, then your hair has good balance of protein and moisture which refers to normal."
    }
];
