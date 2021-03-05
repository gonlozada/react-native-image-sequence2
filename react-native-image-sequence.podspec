require "json"

 package = JSON.parse(File.read(File.join(__dir__, "package.json")))

 Pod::Spec.new do |s|
  s.name         = package["name"]
  s.version      = package["version"]
  s.summary      = package["description"]
  s.author       = "Gonzalo Lozada <gonlozada1@gmail.com>"
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.platform     = :ios, "9.0"
  s.source       = {:git => "https://github.com/gonlozada/react-native-image-sequence2.git" }
  s.source_files  = "ios/RCTImageSequence/*.{h,m}"
  s.dependency "React"
end
