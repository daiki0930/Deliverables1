import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
});

// const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log('------届いているか--------', req.body)
        const { interests, interests1, interests2, interests3 } = req.body;

        try {
            console.log('------届いているか1--------');
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: "You are an assistant who helps elementary school students create independent research themes."},
                    { role: 'user', content: `Suggest a research theme for an elementary school student. Subjects: ${interests}. An interesting experiment: ${interests1}. Duration: ${interests2}. Available materials: ${interests3}`}
                ]
            });
            console.log('------届いているか2--------', completion)

            try {
            const responseText = completion.data.choices[0].message.content.trim();
            console.log('------届いているか3-------', responseText)

            const themeTitle = responseText.split('\n')[0];
            console.log('------届いているか4-------', themeTitle)

            res.status(200).json({ theme: themeTitle });
            } catch (ResponseError) {
                console.error('応答処理のエラーです。', ResponseError)
                res.status(500).json({ error: 'response error.'});
            }
        } catch (error) {
            console.error('APIのエラーです。', error)
            res.status(500).json({ error: 'API error.'})
        }
    } else {
        res.status(405).end();
    }
}