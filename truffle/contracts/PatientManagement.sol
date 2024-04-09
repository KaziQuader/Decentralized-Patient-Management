// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

// id, age, gender, vaccine_status, district, symptoms_details, is_dead.
contract PatientManagement {
    // Variables
    address public admin;
    address[] private patient;
    uint public districtMaxPatient = 0;
    uint public totalPatientCount;
    uint public totalDeathCount;
    uint[4] public ageCount;
    string[] private district;
    string public districtWithMaxPatient;

    struct Patient {
        uint256 id;
        uint256 age;
        string gender;
        string vaccine_status;
        string district;
        string symptoms_details;
        bool is_dead;
    }

    struct Profile {
        address addr;
        string role;
    }

    struct MedianDistrict {
        string district;
        uint median;
    }

    mapping(string => uint256[]) public districts;
    mapping(address => Patient) public patients;

    // Events to inform the client that the state has updated
    event PatientAdded(address patient_add);
    event VaccineStatusUpdated(address patient_add, string vaccine_status);
    event IsDeadStatusUpdated(address patient_add, bool is_dead);

    // Constructor that sets the admin to be a specific address defined in migration
    constructor(address _admin) {
        admin = _admin;
    }

    // Modifier to make sure some functions can only be called by the Admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Add Patient by inputting the necessary params
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

        // If Admin adds patient
        if (msg.sender == admin) {
            patient_add = _patient_address;
            patientId = uint256(
                keccak256(abi.encodePacked(patient_add, block.timestamp))
            );
        }
        // If patients registers by himself / herself
        else {
            patient_add = msg.sender;
            patientId = uint256(
                keccak256(abi.encodePacked(patient_add, block.timestamp))
            );
        }

        // Creating a struct of Patient and storing it in memory by the variable named newPatient
        Patient memory newPatient = Patient(
            patientId,
            _age,
            _gender,
            _vaccine_status,
            _district,
            _symptoms_details,
            _is_dead
        );
        // The mapping patients gets the key as the patient address and value as newPatient
        patients[patient_add] = newPatient;
        patient.push(patient_add);

        // Recording the ages for each district and update the district with max number of patient
        districts[_district].push(_age);
        if (districts[_district].length > districtMaxPatient) {
            districtMaxPatient = districts[_district].length;
            districtWithMaxPatient = _district;
        }
        district.push(_district);

        // Recording death count and patient count
        if (_is_dead) {
            totalDeathCount++;
        }
        totalPatientCount++;

        // Recording age count based on age range
        if (_age <= 12) {
            ageCount[0]++;
        } else if (_age >= 13 && _age <= 19) {
            ageCount[1]++;
        } else if (_age >= 20 && _age <= 49) {
            ageCount[2]++;
        } else {
            ageCount[3]++;
        }

        emit PatientAdded(patient_add);
    }

    // Admin can update vaccine status of patient
    function updateVaccineStatus(
        address _patient_address,
        string memory _vaccine_status
    ) public onlyAdmin {
        patients[_patient_address].vaccine_status = _vaccine_status;
        emit VaccineStatusUpdated(_patient_address, _vaccine_status);
    }

    // Admin can update is_dead status of patient
    function updateIsDead(
        address _patient_address,
        bool _is_dead
    ) public onlyAdmin {
        patients[_patient_address].is_dead = _is_dead;
        emit IsDeadStatusUpdated(_patient_address, _is_dead);
    }

    // Function to let patient download vaccine certificate if he / she recieved two doses
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

    // Get all patients
    function getAllPatients() public view returns (Patient[] memory) {
        // Creating an array of struct
        Patient[] memory allPatients = new Patient[](patient.length);

        // The array of struct is populated with the patients stored in the mapping
        for (uint256 i = 0; i < patient.length; i++) {
            address patientAddress = patient[i];
            allPatients[i] = patients[patientAddress];
        }

        return allPatients;
    }

    // Get profile (admin or patient or unregistered)
    function profile() public view returns (Profile[] memory) {
        Profile[] memory prof = new Profile[](1);

        if (msg.sender == admin) {
            prof[0] = Profile(admin, "Admin");
            return prof;
        } else if (msg.sender != admin && patients[msg.sender].id != 0) {
            prof[0] = Profile(msg.sender, "Patient");
            return prof;
        } else {
            prof[0] = Profile(msg.sender, "Unregistered");
            return prof;
        }
    }

    // Covid Trend Table
    function covidTrendTable()
        public
        view
        returns (
            uint256 averageDeathRate,
            uint256 percentageChildren,
            uint256 percentageTeenagers,
            uint256 percentageYoung,
            uint256 percentageElder,
            string memory maxPatientDistrict,
            MedianDistrict[] memory
        )
    {
        uint median;
        MedianDistrict[] memory allDistrict = new MedianDistrict[](
            district.length
        );

        averageDeathRate = totalDeathCount / totalPatientCount;

        percentageChildren = (ageCount[0] * 100) / totalPatientCount;
        percentageTeenagers = (ageCount[1] * 100) / totalPatientCount;
        percentageYoung = (ageCount[2] * 100) / totalPatientCount;
        percentageElder = (ageCount[3] * 100) / totalPatientCount;

        maxPatientDistrict = districtWithMaxPatient;

        for (uint i = 0; i < district.length; i++) {
            uint[] memory ageArray = districts[district[i]];

            uint[] memory sortedArray = bubbleSort(ageArray);

            // Calculate the median
            if (sortedArray.length % 2 == 0) {
                // If even number of elements, take the average of the middle two
                uint middleIndex1 = (sortedArray.length / 2);
                uint middleIndex2 = middleIndex1 + 1;
                median =
                    (sortedArray[middleIndex1] + sortedArray[middleIndex2]) /
                    2;
            } else {
                // If odd number of elements, take the middle element
                uint middleIndex = (sortedArray.length + 1) / 2;
                median = sortedArray[middleIndex];
            }

            MedianDistrict memory newData = MedianDistrict(district[i], median);

            allDistrict[i] = newData;
        }

        return (
            averageDeathRate,
            percentageChildren,
            percentageTeenagers,
            percentageYoung,
            percentageElder,
            maxPatientDistrict,
            allDistrict
        );
    }

    function bubbleSort(uint[] memory arr) public pure returns (uint[] memory) {
        uint n = arr.length;
        for (uint i = 0; i < n - 1; i++) {
            for (uint j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                }
            }
        }
        return arr;
    }
}
