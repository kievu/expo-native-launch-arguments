import ExpoModulesCore

public class LaunchArgumentsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("LaunchArguments")

    Constants {
      return ["value": argsToDictionary()]
    }
  }

  private func argsToDictionary() -> [String: String] {
    var arguments = Array(ProcessInfo.processInfo.arguments)

    // Remove entrypoint (first element)
    if !arguments.isEmpty {
      arguments.removeFirst()
    }

    var argsDict: [String: String] = [:]
    let truthy = "true"

    var i = 0
    while i < arguments.count {
      let current = arguments[i]

      if isFlag(current) {
        // --some-flag...

        if isPair(current) {
          // --some-flag=some-value
          let pair = current.split(separator: "=", maxSplits: 1)
          if pair.count == 2 {
            let key = cleanValue(String(pair[0]))
            let value = String(pair[1])
            argsDict[key] = value
          }
          i += 1
          continue
        }

        let key = cleanValue(current)

        if i + 1 < arguments.count {
          // has next argument
          let next = arguments[i + 1]

          if isKey(next) {
            // --some-flag (standalone flag)
            argsDict[key] = truthy
          } else {
            // --some-flag some-value
            argsDict[key] = next
            i += 1
          }
        } else {
          // last argument
          argsDict[key] = truthy
        }
      } else if isKey(current) && i + 1 < arguments.count {
        // -key value
        argsDict[cleanValue(current)] = arguments[i + 1]
        i += 1
      } else {
        // maestro bare words as keys
        let next: String? = (i + 1 < arguments.count) ? arguments[i + 1] : nil
        if next == nil || isKey(next!) {
          argsDict[current] = truthy
        } else {
          argsDict[current] = next
          i += 1
        }
      }

      i += 1
    }

    return argsDict
  }

  private func isFlag(_ arg: String) -> Bool {
    return arg.count >= 2 && arg.hasPrefix("--")
  }

  private func isPair(_ arg: String) -> Bool {
    return arg.contains("=")
  }

  private func isKey(_ arg: String) -> Bool {
    return arg.count >= 1 && arg.hasPrefix("-")
  }

  private func cleanValue(_ arg: String) -> String {
    return arg.replacingOccurrences(of: "-", with: "")
  }
}

