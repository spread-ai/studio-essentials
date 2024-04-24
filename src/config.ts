export default {
  showSwcs: true,
  swcQuery:
    "{	id	\n externalIds \n { context \n  aliases \n } \n name \n {\n de \n } \n shortName }",
  colorConf: [
    {
      concept: "ECU HCP HW+SW",
      color: "#fca5a5",
    },
    {
      concept: "ECU HCP HW",
      color: "#fdba74",
    },
    {
      concept: "ECU Embedded",
      color: "#fcd34d",
    },
    {
      concept: "SoftwareContainers",
      color: "#93c5fd",
    },
    {
      concept: "SoftwareModules",
      color: "#5eead4",
    },
    {
      concept: "SoftwareConfigurations",
      color: "#485162",
    },
    {
      concept: "FeatureVariants",
      color: "#485162",
    },
    {
      concept: "VehicleDataConcepts",
      color: "#ec2151",
    },
    {
      concept: "VehicleCommunicationBusSystems",
      color: "#61a6ab",
    },
    {
      concept: "VehicleCommunicationBusSignals",
      color: "#f0a89e",
    },
    {
      concept: "Components",
      color: "#d6d3d1", //#d6d3d1 #c9b7a4
    },
    {
      concept: "FunctionBlocks",
      color: "#524d7d",
    },
    {
      concept: "DevelopmentIssues",
      color: "#f0abfc",
    },
    {
      concept: "PartNumber",
      color: "#bef264",
    },
  ],
  prefixConf: [
    {
      concept: "ECU HCP HW+SW",
      prefix: "SG",
    },
    {
      concept: "ECU HCP HW",
      prefix: "SG",
    },
    {
      concept: "ECU Embedded",
      prefix: "SG",
    },
    {
      concept: "Component",
      prefix: "SG",
    },
    {
      concept: "SoftwareContainer",
      prefix: "SWCL",
    },
    {
      concept: "SoftwareModule",
      prefix: "SWC",
    },
    {
      concept: "Offboard",
      color: "Offb",
    },
  ],
};
