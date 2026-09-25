import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

import 'dotenv/config';
import { beansRouter} from "./routes/beans.routes";
import { i18nRouter} from "./routes/i18n.route";

const PORT = process.env.PORT;
const app = express();


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'public')))

app.use('/api/beans', beansRouter)
app.use('/api/i18n', i18nRouter)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))


// app.get('/api/beans', async (req, res) => {
//     const files = await fs.readdir(DATA_DIR)
//     const beans = await Promise.all(
//         files
//             .filter(f => f.endsWith('.json'))
//             .map(async f => JSON.parse(await fs.readFile(path.join(DATA_DIR, f), 'utf-8')))
//     )
//     res.json(beans)
//
// })

// app.get('/api/beans/:id', async (req, res) => {
//     const files = await fs.readdir(DATA_DIR)
//     for (const f of files) {
//         const bean = JSON.parse(await fs.readFile(path.join(DATA_DIR, f), 'utf-8'))
//         if (bean.id === req.params.id) return res.json(bean)
//     }
//     res.status(404).json({ message: 'Bean not found' })
//
// })