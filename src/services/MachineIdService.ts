class MachineIdClass {
  private machineId: string = "nodeesp32";

  getMachineId = () => {
    return this.machineId;
  };

  change = async (newMachineId: string) => {
    this.machineId = newMachineId;
  };
}

const MachineIdService = new MachineIdClass();
export default MachineIdService;
