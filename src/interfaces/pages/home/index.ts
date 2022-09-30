import { Summary } from '../../../types/components/summary-card';

export default interface ISummaries {
    model: Summary[];
    deploy: Summary[];
    test: Summary[];
}
