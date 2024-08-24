import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { interests, interests1, interests2, interests3 } = req.body;

        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: "You are an assistant who helps elementary school students create independent research themes."},
                    { role: 'user', content: `Suggest a research theme for an elementary school student. Subjects: ${interests}. An interesting experiment: ${interests1}. Duration: ${interests2}. Available materials: ${interests3}`}
                ]
            });

            const responseText = completion.data.choices[0].message.content.trim();

            const themeTitle = responseText.split('\n')[0];

            res.status(200).json({ theme: themeTitle });
        } catch (error) {
            res.status(500).json({ error: 'エラーです。'});
        }
    } else {
        res.status(405).end();
    }
}