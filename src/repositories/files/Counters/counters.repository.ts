import counterSchema from "../../../schemas/Counters.schema";
import { EvidenceFile } from "../../../interfaces/counter.interface";
import { CounterDto } from "../../../dtos/Counters.dto";

export class CountersRepository {
  private counter = counterSchema;

  public createSequence(counterData: CounterDto): Promise<EvidenceFile> {
    return this.counter.create(counterData);
  }

  public async getNextSequenceValue(sequenceName: string): Promise<any> {
    const sequenceDocument = await this.counter.findOneAndUpdate(
      { _id: sequenceName },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true } 
    );

    return sequenceDocument?.sequence_value;
  }
}
