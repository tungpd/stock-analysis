import { ResultsMenuItem } from 'components/StockScreener/_Results/ResultsMenu/ResultsMenuItem';
import React from 'react';

interface Props {
	type: string;
}
export function ResultsNav({ type }: Props) {
	return (
		<nav className="flex-grow py-3 lg:py-1">
			<ul className="flex flex-row items-center whitespace-nowrap space-x-1 text-base">
				{type == 'stock' ? (
					<React.Fragment>
						<ResultsMenuItem type={type} name="General" />
						<ResultsMenuItem type={type} name="Filtered" />
						<ResultsMenuItem type={type} name="Company" />
						<ResultsMenuItem type={type} name="Financials" />
						<ResultsMenuItem type={type} name="Valuation" />
						<ResultsMenuItem type={type} name="Dividends" />
						<ResultsMenuItem type={type} name="Analysts" />
					</React.Fragment>
				) : (
					<React.Fragment>
						<ResultsMenuItem type={type} name="General" />
						<ResultsMenuItem type={type} name="Filtered" />
						<ResultsMenuItem type={type} name="Company" />
						<ResultsMenuItem type={type} name="Income" />
						<ResultsMenuItem type={type} name="Balance Sheet" />
						<ResultsMenuItem type={type} name="Cash Flow" />
					</React.Fragment>
				)}
			</ul>
		</nav>
	);
}
