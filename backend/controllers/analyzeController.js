const pdfParse = require('pdf-parse');
const analyzerService = require('../services/resumeAnalyzer');

exports.analyzeResume = async (req, res) => {
  try {
    const { role, text: manualText } = req.body;
    let resumeText = '';

    if (!role) {
      return res.status(400).json({ message: 'Role is required.' });
    }

    if (req.file) {
      // Parse PDF
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: 'Only PDF files are supported.' });
      }
      const data = await pdfParse(req.file.buffer);
      resumeText = data.text;
    } else if (manualText) {
      resumeText = manualText;
    } else {
      return res.status(400).json({ message: 'Please provide either a PDF file or text.' });
    }

    // Clean text (basic)
    resumeText = resumeText.replace(/\n/g, ' ');

    // Analyze text
    const analysisResult = analyzerService.analyze(resumeText, role);

    res.json({
      role,
      ...analysisResult
    });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ message: 'Server error while analyzing resume.' });
  }
};
