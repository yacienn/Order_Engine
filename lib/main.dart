import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Student Manager',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: StudentApp(),
    );
  }
}

class StudentApp extends StatefulWidget {
  @override
  _StudentAppState createState() => _StudentAppState();
}

class _StudentAppState extends State<StudentApp> {
  final _formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final ageController = TextEditingController();
  final groupController = TextEditingController();

  List<Map<String, dynamic>> students = [];
  bool isLoading = false;

  // Change this based on your setup:
  // - Android emulator: http://10.0.2.2:8000
  // - iOS emulator: http://localhost:8000
  // - Physical device: http://<your-computer-ip>:8000
final String baseUrl = "http://127.0.0.1:8000";
  @override
  void initState() {
    super.initState();
    fetchStudents();
  }

  Future<void> fetchStudents() async {
    setState(() => isLoading = true);
    try {
      final response = await http.get(Uri.parse("$baseUrl/students"));
      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        setState(() {
          students = data.map((e) => Map<String, dynamic>.from(e)).toList();
        });
      } else {
        _showSnackbar("Failed to load students: ${response.statusCode}");
      }
    } catch (e) {
      _showSnackbar("Connection error: $e");
    } finally {
      setState(() => isLoading = false);
    }
  }

  Future<void> addStudent() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => isLoading = true);
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/students"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "name": nameController.text.trim(),
          "age": int.parse(ageController.text),
          "group": int.parse(groupController.text),
        }),
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        // Clear form
        nameController.clear();
        ageController.clear();
        groupController.clear();
        // Refresh list
        await fetchStudents();
        _showSnackbar("Student added successfully!", isError: false);
      } else {
        _showSnackbar("Error: ${response.body}");
      }
    } catch (e) {
      _showSnackbar("Request failed: $e");
    } finally {
      setState(() => isLoading = false);
    }
  }

  void _showSnackbar(String message, {bool isError = true}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: isError ? Colors.red : Colors.green,
        duration: Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Student Management"),
        centerTitle: true,
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: fetchStudents,
          ),
        ],
      ),
      body: Column(
        children: [
          // Input Form
          Container(
            padding: EdgeInsets.all(16),
            color: Colors.grey[100],
            child: Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: nameController,
                    decoration: InputDecoration(
                      labelText: "Full Name",
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.person),
                    ),
                    validator: (value) =>
                        value!.trim().isEmpty ? "Enter name" : null,
                  ),
                  SizedBox(height: 12),
                  TextFormField(
                    controller: ageController,
                    decoration: InputDecoration(
                      labelText: "Age",
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.cake),
                    ),
                    keyboardType: TextInputType.number,
                    validator: (value) {
                      if (value!.isEmpty) return "Enter age";
                      if (int.tryParse(value) == null) return "Invalid number";
                      return null;
                    },
                  ),
                  SizedBox(height: 12),
                  TextFormField(
                    controller: groupController,
                    decoration: InputDecoration(
                      labelText: "Group",
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.group),
                    ),
                    keyboardType: TextInputType.number,
                    validator: (value) {
                      if (value!.isEmpty) return "Enter group";
                      if (int.tryParse(value) == null) return "Invalid number";
                      return null;
                    },
                  ),
                  SizedBox(height: 16),
                  ElevatedButton.icon(
                    onPressed: isLoading ? null : addStudent,
                    icon: Icon(Icons.add),
                    label: Text("Add Student"),
                    style: ElevatedButton.styleFrom(
                      minimumSize: Size(double.infinity, 45),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Divider(height: 1),
          // Student List
          Expanded(
            child: isLoading && students.isEmpty
                ? Center(child: CircularProgressIndicator())
                : students.isEmpty
                    ? Center(child: Text("No students yet. Add one!"))
                    : ListView.builder(
                        padding: EdgeInsets.all(8),
                        itemCount: students.length,
                        itemBuilder: (context, index) {
                          final s = students[index];
                          return Card(
                            elevation: 2,
                            margin: EdgeInsets.symmetric(vertical: 6),
                            child: ListTile(
                              leading: CircleAvatar(
                                child: Text("${s['id']}"),
                                backgroundColor: Colors.blue,
                                foregroundColor: Colors.white,
                              ),
                              title: Text(s['name'],
                                  style: TextStyle(fontWeight: FontWeight.bold)),
                              subtitle: Text("Age: ${s['age']}  |  Group: ${s['group']}"),
                              trailing: Icon(Icons.school, color: Colors.blue),
                            ),
                          );
                        },
                      ),
          ),
        ],
      ),
    );
  }
}