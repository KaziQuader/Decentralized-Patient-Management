// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// id, age, gender, vaccine_status, district, symptoms_details, is_dead.
contract PatientManagement {
    address public admin;

    struct Patient {
        uint256 id;
        uint256 age;
        string gender;
        string vaccine_status;
        string district;
        string symptoms_details;
        bool is_dead;
    }

    mapping(address => Patient) public patients;

    constructor(address _admin) {
        admin = _admin;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    event PateintAdded(address patient_add);

    function addPatient(
        address _patient_address,
        uint256 _age,
        string memory _gender,
        string memory _vaccine_status,
        string memory _district,
        string memory _symptoms_details,
        bool _is_dead
    ) public {
        address patient_add;
        uint256 patientId;

        if (msg.sender == admin) {
            patient_add = _patient_address;
            patientId = uint256(
                keccak256(abi.encodePacked(patient_add, block.timestamp))
            );
        } else {
            patient_add = msg.sender;
            patientId = uint256(
                keccak256(abi.encodePacked(patient_add, block.timestamp))
            );
        }

        Patient memory newPatient = Patient(
            patientId,
            _age,
            _gender,
            _vaccine_status,
            _district,
            _symptoms_details,
            _is_dead
        );
        patients[patient_add] = newPatient;

        emit PateintAdded(patient_add);
    }

    function updateVaccineStatus(
        address _patient_address,
        string memory _vaccine_status
    ) public onlyAdmin {
        patients[_patient_address].vaccine_status = _vaccine_status;
    }

    function updateIsDead(
        address _patient_address,
        bool _is_dead
    ) public onlyAdmin {
        patients[_patient_address].is_dead = _is_dead;
    }

    function certificate() public view returns (string memory) {
        string memory vaccine_stat = patients[msg.sender].vaccine_status;
        string memory equal = "two_doses";

        if (bytes(vaccine_stat).length != bytes(equal).length) {
            return "Please make sure you have recieved two doses";
        }

        for (uint i = 0; i < bytes(vaccine_stat).length; i++) {
            if (bytes(vaccine_stat)[i] != bytes(equal)[i]) {
                return "Please make sure you have recieved two doses";
            }
        }

        return "You have recieved two doses of vaccine";
    }
}
