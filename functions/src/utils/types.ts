import stream from 'stream';

export type CreatSubWallet = {
	businessName: string;
	customerId: string;
};

export type DocumentAnalysisPayload = {
	JobId: string;
	NextToken?: string;
};

export type ExportFile = {
	fieldname: string;
	file: stream.Readable;
	mimetype: string;
};

export type DelinquentCountTotal = {
	totalDeliquencyCount: number;
	delinquentCount0To30?: number;
	delinquentCount30To60?: number;
	delinquentCount60To90?: number;
	delinquentCount90To120?: number;
	delinquentCount120To150?: number;
	delinquentCount150To180?: number;
	delinquentCount180To360?: number;
};

export type Transaction =
	| {
			[key in string]?: string;
	  }
	| null;
