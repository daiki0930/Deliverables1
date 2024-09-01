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
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: "You are an assistant who helps elementary school students create independent research themes. Please respond in Japanese."},
                    { role: 'user', content: `小学生向けの研究テーマを提案してください。テーマだけを教えてください。科目: ${interests}。 面白い実験: ${interests1}。 期間: ${interests2}。使用可能な材料: ${interests3}。`}
                    // { role: 'user', content: `Suggest a research theme for an elementary school student. Subjects: ${interests}. An interesting experiment: ${interests1}. Duration: ${interests2}. Available materials: ${interests3}`}
                ]
            });
            console.log('------届いているか1--------', completion)

            if ( completion && completion.choices && Array.isArray(completion.choices) && completion.choices.length > 0) {

                const responseText = completion.choices[0].message.content.trim();
                console.log('------届いているか2-------', responseText)

                // const themeMatch = responseText.match(/「(.+?)」/);
                // const themeTitle1 = themeMatch ? themeMatch[1] : "テーマが見つかりませんでした。";
                // console.log('------届いているか2.1-------', themeTitle1)

                const themeTitle = responseText.split('\n')[0];
                console.log('------届いているか3-------', themeTitle)

                res.status(200).json({ theme: themeTitle });
            } else {
                console.error('応答処理のエラーです。', completion)
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