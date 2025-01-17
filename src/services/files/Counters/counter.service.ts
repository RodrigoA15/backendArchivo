import { CountersRepository } from "../../../repositories/files/Counters/counters.repository";
import { EvidenceFile } from "../../../interfaces/counter.interface";
import { CounterDto } from "../../../dtos/Counters.dto";

export class CounterService {
  private counterRepository = new CountersRepository();

  public async createSequence(counterData: CounterDto): Promise<EvidenceFile> {
    return await this.counterRepository.createSequence(counterData);
  }

  public async getNextSequenceValue(sequenceName: string): Promise<any> {
    return await this.counterRepository.getNextSequenceValue(sequenceName);
  }
}
