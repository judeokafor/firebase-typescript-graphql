import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use(cors({ origin: true }));

//morgan for logging
app.use(morgan('dev'));

//Use Routes Here
app.use('/api/v1/', routes);

//Error Handlers
app.use((req, res, next) => {
	const err: any = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err: any, _, res: any) => {
	res.status(err.status || 500).json({
		errors: {
			message: err.message,
		},
	});
});

export default app;
